# frozen_string_literal: true

require 'test_helper'

class PotTest < ActiveSupport::TestCase
  setup do
    # sign_in_as users(:one)
  end

  test 'valid pot' do
    pot = Pot.new(
      name: 'Test Pot',
      target: 100,
      theme: 'green'
    )

    assert pot.valid?
    assert pot.save
    assert_equal 0, pot.total
    assert_equal 100, pot.target
    assert_equal 'green', pot.theme
  end

  test 'invalid without name' do
    pot = Pot.new(
      target: 100,
      theme: 'green'
    )

    assert_not pot.valid?
    assert_not pot.save
    assert_includes pot.errors[:name], "can't be blank"
  end

  test 'invalid with negative target' do
    pot = Pot.new(
      name: 'Test Pot',
      target: -100,
      theme: 'green'
    )

    assert_not pot.valid?
    assert_not pot.save
    assert_includes pot.errors[:target], 'must be greater than 0'
  end

  test 'invalid with negative total' do
    pot = Pot.new(
      name: 'Test Pot',
      target: 100,
      total: -50,
      theme: 'green'
    )

    assert_not pot.valid?
    assert_not pot.save
    assert_includes pot.errors[:total], 'must be greater than or equal to 0'
  end

  test 'invalid without theme' do
    pot = Pot.new(
      name: 'Test Pot',
      target: 100,
      theme: nil
    )

    assert_not pot.valid?
    assert_not pot.save
    assert_includes pot.errors[:theme], "can't be blank"
  end

  test 'invalid with invalid theme' do
    pot = Pot.new(
      name: 'Test Pot',
      target: 100,
      theme: 'invalid_theme'
    )

    assert_not pot.valid?
    assert_not pot.save
    assert_includes pot.errors[:theme], 'is not included in the list'
  end
end
