# frozen_string_literal: true

require "test_helper"

class BillsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in_as users(:one)
  end

  test "should get index" do
    get bills_url
    assert_response :success
  end
end
