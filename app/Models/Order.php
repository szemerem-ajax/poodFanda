<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    protected $table = "orders";

    protected $fillable = [
        'id',
        'userid',
        'status',
    ];

    public function foods(): BelongsToMany
    {
        return $this->belongsToMany(Food::class, 'ordersfoods', 'orderid', 'foodid');
    }
}
