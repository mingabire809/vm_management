<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RatePlanResource\Pages;
use App\Filament\Resources\RatePlanResource\RelationManagers;
use App\Models\RatePlan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RatePlanResource extends Resource
{
    protected static ?string $model = RatePlan::class;

    protected static ?string $navigationIcon = 'heroicon-o-bars-3-bottom-right';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255),

                Forms\Components\TextInput::make('price')
                ->required()
                ->numeric()
                ->maxLength(255),

                Forms\Components\TextInput::make('number_of_vm_allowed')
                ->required()
                ->numeric()
                ->maxLength(255),

                Forms\Components\TextInput::make('number_of_backup_allowed')
                ->required()
                ->numeric()
                ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('price'),
                Tables\Columns\TextColumn::make('number_of_vm_allowed'),
                Tables\Columns\TextColumn::make('number_of_backup_allowed'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListRatePlans::route('/'),
            'create' => Pages\CreateRatePlan::route('/create'),
            'edit' => Pages\EditRatePlan::route('/{record}/edit'),
        ];
    }
}
