<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Shop\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = 'Shop';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                                $operation === 'create' ? $set('slug', Str::slug($state)) : null
                            ),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('sku')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('barcode')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Pricing & Stock')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('$'),
                        Forms\Components\TextInput::make('old_price')
                            ->numeric()
                            ->prefix('$'),
                        Forms\Components\TextInput::make('cost')
                            ->numeric()
                            ->prefix('$'),
                        Forms\Components\TextInput::make('qty')
                            ->required()
                            ->numeric()
                            ->default(0),
                        Forms\Components\TextInput::make('security_stock')
                            ->numeric()
                            ->default(0),
                    ])->columns(2),

                Forms\Components\Section::make('Categories & Brand')
                    ->schema([
                        Forms\Components\Select::make('category_id')
                            ->relationship('category', 'name')
                            ->required()
                            ->searchable()
                            ->preload(),
                        Forms\Components\Select::make('brand_id')
                            ->relationship('brand', 'name')
                            ->searchable()
                            ->preload(),
                    ])->columns(2),

                Forms\Components\Section::make('Shipping')
                    ->schema([
                        Forms\Components\TextInput::make('weight_value')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Select::make('weight_unit')
                            ->options([
                                'kg' => 'Kilograms',
                                'g' => 'Grams',
                                'lb' => 'Pounds',
                                'oz' => 'Ounces',
                            ])
                            ->default('kg'),
                        Forms\Components\TextInput::make('height_value')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Select::make('height_unit')
                            ->options([
                                'cm' => 'Centimeters',
                                'm' => 'Meters',
                                'in' => 'Inches',
                                'ft' => 'Feet',
                            ])
                            ->default('cm'),
                        Forms\Components\TextInput::make('width_value')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Select::make('width_unit')
                            ->options([
                                'cm' => 'Centimeters',
                                'm' => 'Meters',
                                'in' => 'Inches',
                                'ft' => 'Feet',
                            ])
                            ->default('cm'),
                        Forms\Components\TextInput::make('depth_value')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Select::make('depth_unit')
                            ->options([
                                'cm' => 'Centimeters',
                                'm' => 'Meters',
                                'in' => 'Inches',
                                'ft' => 'Feet',
                            ])
                            ->default('cm'),
                        Forms\Components\TextInput::make('volume_value')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Select::make('volume_unit')
                            ->options([
                                'l' => 'Liters',
                                'ml' => 'Milliliters',
                                'gal' => 'Gallons',
                                'qt' => 'Quarts',
                            ])
                            ->default('l'),
                    ])->columns(2),

                Forms\Components\Section::make('Status')
                    ->schema([
                        Forms\Components\Toggle::make('is_visible')
                            ->required()
                            ->default(true),
                        Forms\Components\Toggle::make('featured')
                            ->required()
                            ->default(false),
                        Forms\Components\Toggle::make('backorder')
                            ->required()
                            ->default(false),
                        Forms\Components\Toggle::make('requires_shipping')
                            ->required()
                            ->default(true),
                        Forms\Components\DateTimePicker::make('published_at')
                            ->required()
                            ->default(now()),
                    ])->columns(2),

                Forms\Components\Section::make('SEO')
                    ->schema([
                        Forms\Components\TextInput::make('seo_title')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('seo_description')
                            ->maxLength(255),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('brand.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->money()
                    ->sortable(),
                Tables\Columns\TextColumn::make('qty')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_visible')
                    ->boolean(),
                Tables\Columns\IconColumn::make('featured')
                    ->boolean(),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),
                Tables\Filters\SelectFilter::make('brand')
                    ->relationship('brand', 'name'),
                Tables\Filters\TernaryFilter::make('is_visible')
                    ->label('Visible'),
                Tables\Filters\TernaryFilter::make('featured')
                    ->label('Featured'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
} 