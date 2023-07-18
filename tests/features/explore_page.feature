Feature: Explore Page
  Displays list of park data

  Scenario: Explore page loads
    Given The user navigates to the explore page
    Then The explore page should be displayed

  Scenario: The explore page loads more elements
    Given The explore page shows 20 elements
    When The user selects show more button
    Then The explore page shows 40 elements

  Scenario: The explore page can be filtered by state
    Given The user navigates to the explore page
    When The user selects TX from the state selector dropdown
    Then Only TX parks are displayed

  Scenario: The explore page can be filtered by type
    Given The user navigates to the explore page
    When The user selects Monument from the type selector dropdown
    Then Only Monument parks are displayed

  Scenario: The explore page filter modal opens
    Given The user navigates to the explore page
    When The user clicks on the filter icon
    Then The filters modal is "visible"
    When The user clicks off the modal
    Then The filters modal is "hidden"

  Scenario: The explore page can be filtered by activity
    Given The user navigates to the explore page
    When The user selects multiple activities from the filter modal
    Then Only parks with those activities are displayed
    And Each activity is shown in the filters toolbar
