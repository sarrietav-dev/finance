require "test_helper"

class PotsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pot = pots(:one)
    sign_in_as users(:one)
  end

  test "should get index" do
    get pots_url
    assert_response :success
    assert_match "Pots", @response.body
    assert_match @pot.name, @response.body
    assert_dom "article", 2
  end

  test "should create pot (turbo_stream)" do
    assert_difference("Pot.count") do
      post pots_url(format: :turbo_stream),
        params: {pot: {name: "New Pot", target: 200, theme: "green"}}
    end
    assert_response :success
    assert_includes @response.media_type, "turbo-stream"
  end

  test "should not create pot" do
    assert_no_difference("Pot.count") do
      post pots_url(format: :turbo_stream),
        params: {pot: {name: "", target: 200, theme: "green"}}
    end
    assert_response :unprocessable_entity
    assert_match "1 error", @response.body
    assert_match "Name can&#39;t be blank", @response.body
  end

  test "should destroy pot (turbo_stream)" do
    assert_difference("Pot.count", -1) do
      delete pot_url(@pot, format: :turbo_stream)
    end
    assert_response :success
    assert_includes @response.media_type, "turbo-stream"
    assert_match "No pots found", @response.body if Pot.count.zero?
  end

  test "should show 'No pots found' when last pot destroyed" do
    Pot.delete_all
    last_pot = Pot.create!(name: "Last Pot", target: 50, theme: "green")
    delete pot_url(last_pot, format: :turbo_stream)
    assert_equal 0, Pot.count
    assert_match "No pots found", @response.body
    refute_match "hidden", @response.body # Should not be hidden when no pots
  end
end
