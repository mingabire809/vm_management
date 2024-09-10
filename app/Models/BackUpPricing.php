<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BackUpPricing extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'backup_id', 'cost'];

    public function vm(){
        return $this->belongsTo(VM::class);
    }
    
}
