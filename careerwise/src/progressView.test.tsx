import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ProgressView } from './ProgressView';
import { CreateCareerGoal } from './components/CreateCareerGoal';
import { TableReviews } from './components/TableReview';

// Mock the child components
jest.mock('./components/CreateCareerGoal');
jest.mock('./components/TableReview');

const MockedCreateCareerGoal = CreateCareerGoal as jest.MockedFunction<typeof CreateCareerGoal>;
const MockedTableReviews = TableReviews as jest.MockedFunction<typeof TableReviews>;

// Helper function to render ProgressView with MantineProvider
const renderProgressView = (page: 'home' | 'progress' = 'progress') => {
  const setPage = jest.fn();
  return {
    ...render(
      <MantineProvider>
        <ProgressView page={page} setPage={setPage} />
      </MantineProvider>
    ),
    setPage,
  };
};

describe('ProgressView Component', () => {
  let goalCounter = 0;
  
  beforeEach(() => {
    jest.clearAllMocks();
    goalCounter = 0;
    
    // Setup default mock implementations
    MockedCreateCareerGoal.mockImplementation(({ onAdd, onAddMilestone, existingGoals }) => (
      <div data-testid="create-career-goal">
        <button
          data-testid="mock-add-goal"
          onClick={() => {
            goalCounter++;
            onAdd({
              title: `Test Goal ${goalCounter}`,
              category: 'Job Application',
              description: 'Test Description',
            });
          }}
        >
          Add Goal
        </button>
        <button
          data-testid="mock-add-milestone"
          onClick={() =>
            onAddMilestone?.({
              title: 'Test Milestone',
              description: 'Test Milestone Description',
              goalTitle: existingGoals?.[0]?.title || 'Test Goal 1',
              completed: false,
            })
          }
        >
          Add Milestone
        </button>
        <div data-testid="existing-goals-count">{existingGoals?.length || 0}</div>
      </div>
    ));

    MockedTableReviews.mockImplementation(({ data, milestones, comments, handleAddComment }) => (
      <div data-testid="table-reviews">
        <div data-testid="goals-count">{data.length}</div>
        <div data-testid="milestones-count">{milestones?.length || 0}</div>
        <div data-testid="comments-count">{comments?.length || 0}</div>
        <button
          data-testid="mock-add-comment"
          onClick={() =>
            handleAddComment?.({
              text: 'Test Comment',
              GoalTitle: data[0]?.title || 'Test Goal 1',
            })
          }
        >
          Add Comment
        </button>
        <div data-testid="goals-data">
          {data.map((goal) => (
            <div key={goal.title} data-testid={`goal-${goal.title}`}>
              {goal.title}
            </div>
          ))}
        </div>
        <div data-testid="milestones-data">
          {milestones?.map((milestone) => (
            <div key={milestone.title} data-testid={`milestone-${milestone.title}`}>
              {milestone.goalTitle}
            </div>
          ))}
        </div>
        <div data-testid="comments-data">
          {comments?.map((comment, idx) => (
            <div key={idx} data-testid={`comment-${idx}`}>
              {comment.GoalTitle}
            </div>
          ))}
        </div>
      </div>
    ));
  });

  test('1. Component renders correctly with all main elements', () => {
    renderProgressView();

    // Check for main text
    expect(screen.getByText('Progress Tracker')).toBeInTheDocument();

    // Check for child components
    expect(screen.getByTestId('create-career-goal')).toBeInTheDocument();
    expect(screen.getByTestId('table-reviews')).toBeInTheDocument();

    // Check for navigation button
    expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument();
  });

  test('3. Adding a goal updates the goals state and passes it to TableReviews', () => {
    renderProgressView();

    // Initially no goals
    expect(screen.getByTestId('goals-count')).toHaveTextContent('0');

    // Add a goal
    fireEvent.click(screen.getByTestId('mock-add-goal'));

    // Check that goal count increased
    expect(screen.getByTestId('goals-count')).toHaveTextContent('1');

    // Verify the goal appears in the rendered data
    expect(screen.getByTestId('goal-Test Goal 1')).toBeInTheDocument();

    // Verify TableReviews was called with the new goal
    const lastCall = MockedTableReviews.mock.calls[MockedTableReviews.mock.calls.length - 1];
    expect(lastCall[0].data).toHaveLength(1);
    expect(lastCall[0].data[0]).toMatchObject({
      title: 'Test Goal 1',
      category: 'Job Application',
      description: 'Test Description',
    });
  });

  test('4. Adding a milestone updates the milestones state and passes it to TableReviews', () => {
    renderProgressView();

    // First add a goal
    fireEvent.click(screen.getByTestId('mock-add-goal'));

    // Then add a milestone
    fireEvent.click(screen.getByTestId('mock-add-milestone'));

    // Check that milestone count increased
    expect(screen.getByTestId('milestones-count')).toHaveTextContent('1');

    // Verify milestone is associated with the goal
    expect(screen.getByTestId('milestone-Test Milestone')).toHaveTextContent('Test Goal 1');

    // Verify TableReviews was called with the milestone
    const lastCall = MockedTableReviews.mock.calls[MockedTableReviews.mock.calls.length - 1];
    expect(lastCall[0].milestones).toHaveLength(1);
    expect(lastCall[0].milestones?.[0]).toMatchObject({
      title: 'Test Milestone',
      description: 'Test Milestone Description',
      goalTitle: 'Test Goal 1',
      completed: false,
    });
  });

  test('5. Adding a comment updates the comments state and passes it to TableReviews', () => {
    renderProgressView();

    // First add a goal
    fireEvent.click(screen.getByTestId('mock-add-goal'));

    // Then add a comment
    fireEvent.click(screen.getByTestId('mock-add-comment'));

    // Check that comment count increased
    expect(screen.getByTestId('comments-count')).toHaveTextContent('1');

    // Verify comment is associated with the goal
    expect(screen.getByTestId('comment-0')).toHaveTextContent('Test Goal 1');

    // Verify TableReviews was called with the comment
    const lastCall = MockedTableReviews.mock.calls[MockedTableReviews.mock.calls.length - 1];
    expect(lastCall[0].comments).toHaveLength(1);
    expect(lastCall[0].comments?.[0]).toMatchObject({
      text: 'Test Comment',
      GoalTitle: 'Test Goal 1',
    });
  });

  test('6. Navigation button calls setPage with "home" when clicked', () => {
    const { setPage } = renderProgressView();

    const backButton = screen.getByRole('button', { name: /back to dashboard/i });
    fireEvent.click(backButton);

    expect(setPage).toHaveBeenCalledWith('home');
    expect(setPage).toHaveBeenCalledTimes(1);
  });

  test('7. Multiple goals can be added and all are passed to TableReviews', () => {
    renderProgressView();

    // Add multiple goals
    fireEvent.click(screen.getByTestId('mock-add-goal'));
    fireEvent.click(screen.getByTestId('mock-add-goal'));
    fireEvent.click(screen.getByTestId('mock-add-goal'));

    // Check that all goals are present
    expect(screen.getByTestId('goals-count')).toHaveTextContent('3');

    // Verify all goals appear in the rendered data
    const goalElements = screen.getAllByTestId(/^goal-/);
    expect(goalElements.length).toBe(3);

    // Verify TableReviews was called with all three goals
    const lastCall = MockedTableReviews.mock.calls[MockedTableReviews.mock.calls.length - 1];
    expect(lastCall[0].data).toHaveLength(3);
  });

  test('8. Milestones are correctly associated with their goals', () => {
    renderProgressView();

    // Add a goal first
    fireEvent.click(screen.getByTestId('mock-add-goal'));

    // Add a milestone associated with that goal
    fireEvent.click(screen.getByTestId('mock-add-milestone'));

    // Verify milestone has correct goalTitle
    expect(screen.getByTestId('milestone-Test Milestone')).toHaveTextContent('Test Goal 1');

    // Verify the milestone is correctly associated
    const lastCall = MockedTableReviews.mock.calls[MockedTableReviews.mock.calls.length - 1];
    expect(lastCall[0].milestones?.[0]?.goalTitle).toBe('Test Goal 1');
  });

  test('9. Comments are correctly associated with their goals', () => {
    renderProgressView();

    // Add a goal first
    fireEvent.click(screen.getByTestId('mock-add-goal'));

    // Add a comment associated with that goal
    fireEvent.click(screen.getByTestId('mock-add-comment'));

    // Verify comment has correct GoalTitle
    expect(screen.getByTestId('comment-0')).toHaveTextContent('Test Goal 1');

    // Verify the comment is correctly associated
    const lastCall = MockedTableReviews.mock.calls[MockedTableReviews.mock.calls.length - 1];
    const comment = lastCall[0].comments?.[0];
    expect(comment?.GoalTitle).toBe('Test Goal 1');
  });
});
