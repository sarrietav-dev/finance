# frozen_string_literal: true

require "application_system_test_case"

class PotsTest < ApplicationSystemTestCase
  setup do
    @pot = pots(:one)
  end

  test "visiting the index" do
    visit pots_url
    assert_selector "h1", text: "Pots"
  end

  test "should create pot" do
    visit pots_url
    click_on "New pot"

    fill_in "Name", with: @pot.name
    fill_in "Target", with: @pot.target
    fill_in "Theme", with: @pot.theme
    fill_in "Total", with: @pot.total
    click_on "Create Pot"

    assert_text "Pot was successfully created"
    click_on "Back"
  end

  test "should update Pot" do
    visit pot_url(@pot)
    click_on "Edit this pot", match: :first

    fill_in "Name", with: @pot.name
    fill_in "Target", with: @pot.target
    fill_in "Theme", with: @pot.theme
    fill_in "Total", with: @pot.total
    click_on "Update Pot"

    assert_text "Pot was successfully updated"
    click_on "Back"
  end

  test "should destroy Pot" do
    visit pot_url(@pot)
    accept_confirm { click_on "Destroy this pot", match: :first }

    assert_text "Pot was successfully destroyed"
  end
end
