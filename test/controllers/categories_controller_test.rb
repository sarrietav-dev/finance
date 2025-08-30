# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @category = categories(:one)
    sign_in_as users(:one)
  end

  test "should get index" do
    get categories_url
    assert_response :success
  end

  test "should get new" do
    get new_category_url
    assert_response :success
  end

  test "should create category" do
    assert_difference("Category.count") do
      post categories_url, params: {category: {name: "New Category"}}
    end

    assert_redirected_to categories_url
  end

  test "should show category" do
    get category_url(@category)
    assert_response :success
  end

  test "should get edit" do
    get edit_category_url(@category)
    assert_response :success
  end

  test "should update category" do
    patch category_url(@category), params: {category: {name: "Updated Category"}}
    assert_redirected_to categories_url
  end

  test "should destroy category" do
    # Create a category that is not associated with any budget or transaction
    category_to_destroy = Category.create!(name: "To be destroyed")
    assert_difference("Category.count", -1) do
      delete category_url(category_to_destroy)
    end

    assert_redirected_to categories_url
  end
end
