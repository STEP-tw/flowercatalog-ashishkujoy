const toKeyValPair = function(accumulator,keyVal){
  keyVal = keyVal.trim();
  if(keyVal=='') return accumulator;
  keyVal = keyVal.split('=');
  accumulator[keyVal[0]]=keyVal[1];
  return accumulator;
}

const parseData = function(data){
  try{
    return JSON.parse(data);
  }catch(error){
    return data.split('&').reduce(toKeyValPair,{})
  }
}
