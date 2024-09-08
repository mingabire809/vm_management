<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatePlan extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'price', 'number_of_vm_allowed', 'number_of_backup_allowed'];


    public function subscription(){
        return $this->hasMany(Subscription::class, 'rateplan_id');
    }
}
