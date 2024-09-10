<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'vm_id', 'backup_name', 'path'];

    public function vm(){
        return $this->belongsTo(VM::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    
}
