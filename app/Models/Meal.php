<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected function orderitem(){
        return $this->hasMany(OrderItem::class);
    }
}
