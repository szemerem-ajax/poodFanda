<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    protected $table = "orders";

    protected $fillable = [
        'userid',
        'status',
        'courierid'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userid', 'id');
    }

    public function courier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'courierid', 'id');
    }

    public function foods(): BelongsToMany
    {
        return $this->belongsToMany(Food::class, 'ordersfoods', 'orderid', 'foodid');
    }
}
