<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VMResource\Pages;
use App\Filament\Resources\VMResource\RelationManagers;
use App\Models\VM;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Events\ChangeVMOwner;
use App\Events\NewVMOwner;

class VMResource extends Resource
{
    protected static ?string $model = VM::class;

    protected static ?string $navigationIcon = 'heroicon-o-inbox-stack';

    public static function boot()
    {
        parent::boot();

        static::updating(function (VM $model) {
            // Assuming the `owner_id` is the field to track ownership
            $old_user_id = $model->getOriginal('user_id');
            $new_user_id = $model->user_id;

            broadcast(new ChangeVMOwner($old_user_id));
            broadcast(new NewVMOwner($new_user_id));
        });
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('name')
               
                ->options([
                   "Windows 11",
        "Windows 10",
        "Windows 8.1",
        "Windows 7",
        "macOS Ventura",
        "macOS Monterey",
        "macOS Big Sur",
        "macOS Catalina",
        "Linux Ubuntu",
        "Linux Debian",
        "Linux Fedora",
        "Linux Arch",
        "Linux Mint",
        "Linux CentOS",
        "Linux Red Hat Enterprise Linux (RHEL)",
        "Linux openSUSE",
        "FreeBSD",
        "OpenBSD",
        "Solaris",
        
        // Mobile Operating Systems
        "iOS",
        "Android",
        "HarmonyOS",
        "KaiOS",
        "Windows Phone",
        "BlackBerry OS",
        "Sailfish OS",
        "Tizen",
      
        // Server Operating Systems
        "Windows Server 2022",
        "Windows Server 2019",
        "Windows Server 2016",
        "Linux Ubuntu Server",
        "Linux CentOS Server",
        "Linux Red Hat Enterprise Linux (RHEL) Server",
        "Linux Debian Server",
        "Linux SUSE Linux Enterprise Server (SLES)",
        "FreeBSD Server",
        "Oracle Linux",
      
        // Real-Time Operating Systems (RTOS)
        "FreeRTOS",
        "RTLinux",
        "VxWorks",
        "QNX",
        "ThreadX",
      
        // Legacy and Other Operating Systems
        "MS-DOS",
        "AmigaOS",
        "BeOS",
        "HP-UX",
        "AIX",
        "OS/2",
        "MorphOS"
                ]),

                Forms\Components\Select::make('storage')
               
                ->options([
                    16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384
                ]),

                Forms\Components\Select::make('ram')
               
                ->options([
          
                    2, 4, 8, 16, 32, 64, 128, 256
        
                ]),

                Forms\Components\Select::make('processor')
               
                ->options([
                   "Intel Core i3",
        "Intel Core i5",
        "Intel Core i7",
        "Intel Core i9",
        "AMD Ryzen 3",
        "AMD Ryzen 5",
        "AMD Ryzen 7",
        "AMD Ryzen 9",
        "Apple M1",
        "Apple M1 Pro",
        "Apple M1 Max",
        "Apple M2",
        "Qualcomm Snapdragon 888",
        "Qualcomm Snapdragon 8 Gen 1",
        "Exynos 2100",
        "MediaTek Dimensity 1200",
        "ARM Cortex-A76",
        "Intel Xeon",
        "AMD EPYC"
                ]),

                Forms\Components\Select::make('user_id')
            ->relationship('users', 'name')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('users.name'),
                Tables\Columns\TextColumn::make('storage'),
                Tables\Columns\TextColumn::make('ram'),
                Tables\Columns\TextColumn::make('processor'),
                Tables\Columns\TextColumn::make('status'),
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
            'index' => Pages\ListVMS::route('/'),
            'create' => Pages\CreateVM::route('/create'),
            'edit' => Pages\EditVM::route('/{record}/edit'),
        ];
    }
}
