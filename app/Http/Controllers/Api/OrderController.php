<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userid = $request->query('userid');
        $restaurantid = $request->query('restaurantid');
        $courierid = $request->query('courierid');

        if ($userid !== null)
        {
            return JsonResource::collection(
                Order::where('userid', '=', $userid)
                    ->get()
                    ->load(['foods'])
            );
        }
        else if ($restaurantid !== null)
        {
            return JsonResource::collection(
                Order::query()
                    ->whereHas('foods', function ($query) use ($restaurantid) {
                        return $query->where('restaurantid',  '=', $restaurantid);
                    })
                    ->get()
                    ->load(['foods'])
            );
        }
        else if ($courierid !== null)
        {
            return JsonResource::collection(
                Order::where('courierid', '=', $courierid)
                    ->get()
                    ->load(['foods', 'foods.restaurant'])
            );
        }
        else
        {
            return new JsonResource(Order::all()->load(['user', 'foods', 'foods.restaurant', 'courier']));
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
                'payment_type' => $request['payment_type'],
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
        if ($request['courierid'] !== null && $order->courierid !== null && $order->courierid !== $request['courierid'])
        {
            throw new ConflictHttpException;
        }

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
