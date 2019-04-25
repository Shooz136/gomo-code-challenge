import { FragmentService } from './fragment-service';
import { VideoFragment } from '../models/VideoFragment';

describe('FragmentService', () => {
  let service: FragmentService;
  const firstTestFragments: VideoFragment[] = [{StartTime: 0, EndTime: 100},
                                               {StartTime: 50, EndTime: 200}];

  const secondTestFragments: VideoFragment[] = [{StartTime: 5000, EndTime: 7500},
                                                {StartTime: 3000, EndTime: 10000},
                                                {StartTime: 2000, EndTime: 4000}];

  const thirdTestFragments: VideoFragment[] = [{StartTime: 500, EndTime: 3000},
                                               {StartTime: 8000, EndTime: 10000},
                                               {StartTime: 0, EndTime: 2000}];

  const emptyFragmentArray: VideoFragment[] = [];

  const badFragmentArray: VideoFragment[] = [{StartTime: 0, EndTime: 50},
                                             {StartTime: null, EndTime: null},
                                             {StartTime: 50, EndTime: 200},
                                             {StartTime: 200, EndTime: 0}];

  beforeEach(() => { service = new FragmentService(); });

  it('Should Exist', () => {
    expect(service).toBeDefined();
  });

  it('Should Coalesce Overlapping Fragments', () => {
    expect(service.coalesceFragments(firstTestFragments)).toEqual([{StartTime: 0, EndTime: 200}]);
    expect(service.coalesceFragments(secondTestFragments)).toEqual([{StartTime: 2000, EndTime: 10000}]);
    expect(service.coalesceFragments(thirdTestFragments)).toEqual([{StartTime: 0, EndTime: 3000}, {StartTime: 8000, EndTime: 10000}]);
  });

  it('Should Calculate Correct Unique View Time', () => {
    expect(service.calculateUVT(service.coalesceFragments(firstTestFragments))).toEqual(200);
    expect(service.calculateUVT(service.coalesceFragments(secondTestFragments))).toEqual(8000);
    expect(service.calculateUVT(service.coalesceFragments(thirdTestFragments))).toEqual(5000);
  });

  it('Should Handle Empty Fragment Arrays - Coalesce', () => {
    expect(service.coalesceFragments(emptyFragmentArray)).toEqual([]);
  });

  it('Should Handle Empty Fragment Arrays - UVT', () => {
    expect(service.calculateUVT(service.coalesceFragments(emptyFragmentArray))).toEqual(0);
  });

  it('Should Handle Arrays With Bad Fragments - Coalesce', () => {
    expect(service.coalesceFragments(badFragmentArray)).toEqual([{StartTime: 0, EndTime: 200}]);
  });

  it('Should Handle Arrays With Bad Fragments - UVT', () => {
    expect(service.calculateUVT(service.coalesceFragments(badFragmentArray))).toEqual(200);
  });


});
