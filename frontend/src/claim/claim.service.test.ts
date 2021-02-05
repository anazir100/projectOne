import axios from 'axios';
import claimService from './claim.service';

test('getClaims returns a promise with data in it.', async ()=>{
    let returnValues;
    
    let obj = {data: []};
    axios.get = jest.fn().mockResolvedValue(obj);
    await claimService.getClaims().then((arr) => {
        returnValues = arr;
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(returnValues).toBe(obj.data);
    expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_SERVER_URI+'claims');
});

