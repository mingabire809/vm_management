<?php

namespace App\Filament\Resources\VMResource\Pages;

use App\Filament\Resources\VMResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListVMS extends ListRecords
{
    protected static string $resource = VMResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
