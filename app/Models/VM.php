<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

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
