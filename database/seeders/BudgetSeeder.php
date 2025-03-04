<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $budgets = [
            [
                "category" => "Entertainment",
                "maximum" => 50,
                "theme" => "#277C78",
                "user_id" => 1
            ],
            [
                "category" => "Bills",
                "maximum" => 750,
                "theme" => "#82C9D7",
                "user_id" => 1
            ],
            [
                "category" => "Dining Out",
                "maximum" => 75,
                "theme" => "#F2CDAC",
                "user_id" => 1
            ],
            [
                "category" => "Personal Care",
                "maximum" => 100,
                "theme" => "#626070",
                "user_id" => 1
            ]
        ];

        DB::table('budgets')->insert($budgets);
    }
}
