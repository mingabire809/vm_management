<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use App\Models\User;
use App\Events\ChangeVMOwner;
use App\Events\NewVMOwner;


class VM extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = ['name', 'storage', 'ram', 'processor', 'user_id', 'status'];
    protected $auditInclude = [
        'user_id',
        'status',
        'ram',
        'storage',
        'processor'
    ];

    protected static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            $originalData = $model->getOriginal();

            
            \Log::info('Original Data:', $originalData);
            $originalUserId = $originalData['user_id'];
            $user = User::find($originalUserId);
            broadcast(new ChangeVMOwner($user)); 

            // Example: You can check specific fields
            if ($originalData['status'] !== $model->status) {
                // Do something if the status is changing
            }
        });
    }

    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function backup(){
        return $this->hasMany(Backup::class, 'vm_id');
    }

    public function cost(){
        return $this->hasMany(BackUpPricing::class, 'vm_id');
    }
}
