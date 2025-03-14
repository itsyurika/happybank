import { makeFetchResponseMock } from '../../../_shared/__mocks__/fetchResponse.mock';
import { makeMemoryMock } from '../../../_shared/__mocks__/memory.mock';
import { getMemory } from '../getMemory';

describe('getMemory', () => {
  let fetchSpy: jest.SpyInstance<ReturnType<typeof fetch>>;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  test('returns success when API call is successful', async () => {
    fetchSpy.mockResolvedValue(makeFetchResponseMock({ json: async () => makeMemoryMock() }));

    const apiMemoryResult = await getMemory();

    expect(apiMemoryResult).toEqual({ isSuccess: true, data: makeMemoryMock() });
  });

  test('returns error when API call fails with a message', async () => {
    const errorMessage = 'some error';
    fetchSpy.mockResolvedValueOnce(
      makeFetchResponseMock({
        ok: false,
        json: jest.fn().mockResolvedValueOnce({ message: errorMessage }),
      }),
    );

    const result = await getMemory();

    expect(result).toStrictEqual({ isSuccess: false, error: errorMessage });
  });

  test('returns unknown error when fetch throws an error', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'));

    const apiMemoryResult = await getMemory();

    expect(apiMemoryResult).toEqual({ isSuccess: false, error: 'unknown error' });
  });
});
