<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VM extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'storage', 'ram', 'processor', 'user_id', 'status'];


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
