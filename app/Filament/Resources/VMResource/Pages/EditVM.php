<?php

namespace App\Filament\Resources\VMResource\Pages;

use App\Filament\Resources\VMResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditVM extends EditRecord
{
    protected static string $resource = VMResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
