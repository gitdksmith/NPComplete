Feature: Explore Page
  Displays list of park data

  Scenario: Explore page loads
    Given The user navigates to the explore page
    Then The explore page should be displayed

  Scenario: The explore page loads more elements
    Given The explore page shows 20 elements
    When The user selects show more button
    Then The explore page shows 40 elements
  
  # Scenario: The explore page can be filtered by state
  #   Given The user navigates to the application
  #   When The user selects TX from the state selector dropdown
  #   Then Only TX parks are displayed