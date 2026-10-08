<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index()
    {
        $package = Package::latest()->get();
        return;
    }

    public function store(Request $request)
    {
        $validatedData = $request->Validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'meal_count' => 'require|integer|min:1',
            'days_count' => 'require|integer|min:1',
            'price' => 'require|numeric|min:0',
            'is_active' => 'boolean',
        ]);
        $validatedData['is_active'] = $request->has('is_active') ? $request->is_active : false;

        Package::create($validatedData);
        return;
    }

    public function edit(Package $package)
    {
        return;
    }

    public function update(Request $request, Package $package)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'meals_count' => 'required|integer|min:1',
            'duration_days' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);
        $validatedData['is_active'] = $request->has('is_active') ? $request->is_active : false;

        $package->update($validatedData);

        return redirect()->route('')->with('message', 'seccessfull Update');
    }


    public function destroy(Package $package)
    {
        $package->delete();
        return redirect()->back()->with('message', 'seccessfully deleted');
    }
}
