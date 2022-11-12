<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

route::apiResource('/products', ProductController::class);
route::post('/products/search', [ProductController::class, 'search']);
route::get('/products/slug/{slug}', [ProductController::class, 'findSlug']);
route::get('/products/brand/{brand}', [ProductController::class, 'relativeProduct']);

route::apiResource("/categories", CategoryController::class);

route::apiResource("/brands", BrandController::class);

route::apiResource('/reviews', ReviewController::class);

route::apiResource('/orders', OrderController::class);

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/register', 'register')->name('register');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
    Route::get('/me', 'me');
});

Route::get('/upload', [FileUploadController::class, 'showUpLoadForm'])->name('show_upload');
Route::post('/upload', [FileUploadController::class, 'storeUploads']);