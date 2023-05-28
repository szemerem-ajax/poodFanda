<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            return JsonResource::collection(
                Order::where('userid', '=', $userid)
                    ->get()
                    ->load(['foods'])
                    ->where('foods.restaurantid', '=', $restaurantid)
            );
        }
        else if ($restaurantid !== null)
        {
            return JsonResource::collection(
                Order::query()
                    ->get()
                    ->load(['foods'])
            );
        }
        else
        {
            return new JsonResource([]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $orders = array();
        foreach ($request['foods'] as $foodid) {
            $food = Food::find($foodid);
            $orders[$food->restaurantid][] = $food;
        }

        $entries = array_map(function ($order) use ($request) {
            $entry = Order::create([
                'userid' => $request['userid'],
                'status' => 'placed'
            ]);

            $entry->save();
            foreach ($order as $food) {
                $entry->foods()->attach($food);
            }
            $entry->save();

            return $entry;
        }, $orders);

        return new JsonResource($entries);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return new JsonResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->update($request->all());
        return new JsonResource($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
    }
}
