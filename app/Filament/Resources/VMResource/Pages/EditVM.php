<?php

namespace App\Filament\Resources\VMResource\Pages;

use App\Filament\Resources\VMResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Events\ChangeVMOwner;
use App\Events\NewVMOwner;
use App\Models\User;


class EditVM extends EditRecord
{
    protected static string $resource = VMResource::class;

   /* protected function mutateFormDataBeforeSave(array $data): array
    {
        // Modify the form data if needed before saving
        $originalData = $this->getRecord(); // This retrieves the original unmodified record

    // You can now get the original user_id (or any other fields) from the original record
        $originalUserId = $originalData->user_id; 
        $user = User::find($originalUserId);
        dd($user);
        broadcast(new ChangeVMOwner($user)); 
        return $data;
    }*/

    protected function afterSave(): void
    {
        // Assuming there's a user related to this post
        $vm = $this->record; // Get the current post being updated

        // Find the user related to the post and update another field
        $user = User::find($vm->user_id); // Replace with actual relationship logic
        
        broadcast(new NewVMOwner($user));
    }


    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
