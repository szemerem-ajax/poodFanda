<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrdersResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userid = $request->query('userid');
        $restaurantid = $request->query('restaurantid');

        if ($userid !== null)
        {
            return OrdersResource::collection(Order::where('userid', '=', $userid));
        }
        else if ($restaurantid === null)
        {
            // TODO: Return the stuff here!
        }
        else
        {
            return new OrdersResource([]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = Order::create($request->all());

        return new OrdersResource($order);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $order = Order::find($request->query('id'));

        return new OrdersResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->update($request->all());
        return new OrdersResource($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        Order::destroy($request->query('id'));
    }
}
