// import { render, screen, waitFor } from '@testing-library/react';

// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import Balance from './Balance';

// // Mocked response data
// const mockResponseData = {
//   balance: 100, // Sample balance amount
//   ledger_balance: 200, // Sample ledger balance amount
//   total_payout: 300, // Sample total payout amount
//   total_revenue: 400, // Sample total revenue amount
//   pending_payout: 50, // Sample pending payout amount
// };

// // Mock API server with response data
// const server = setupServer(
//   rest.get('/wallet', (req, res, ctx) => {
//     return res(ctx.json(mockResponseData));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe('Balance component', () => {
//   it('renders balance after fetching data', async () => {
//     render(<Balance />);
//     const loadingElement = screen.getByText('Loading...');
//     expect(loadingElement).toBeInTheDocument();

//     // Wait for the balance data to be rendered
//     await waitFor(() => {
//       expect(screen.getByText('Available Balance')).toBeInTheDocument();
//       expect(screen.getByText(`USD ${mockResponseData.balance}`)).toBeInTheDocument();
//     });
//   });
// });
