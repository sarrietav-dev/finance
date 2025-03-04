<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Pot;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OverviewController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $transactions = Transaction::latest()->limit(4)->select(['avatar', 'name', 'date', 'amount', 'id'])->get();

        $currentBalance = Transaction::sum('amount');
        $income = Transaction::where('amount', '>', 0)->sum('amount');
        $expenses = Transaction::where('amount', '<', 0)->sum('amount');

        $pots = Pot::all();
        $pots_total = $pots->sum('total');

        $budgets = Budget::join('transactions', 'budgets.category', '=', 'transactions.category')
            ->groupBy('budgets.category', 'budgets.maximum', 'budgets.theme')
            ->select('budgets.category', 'budgets.maximum', 'budgets.theme', DB::raw('SUM(transactions.amount) as amount'))
            ->get();


        return inertia('Overview', [
            'transactions' => $transactions,
            'currentBalance' => $currentBalance,
            'income' => $income,
            'expenses' => $expenses,
            'pots' => $pots,
            'pots_total' => $pots_total,
            'budgets' => $budgets,
        ]);
    }
}
