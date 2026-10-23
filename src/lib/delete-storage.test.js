import { expect, test } from 'bun:test';
import { deleteStorageTree } from './delete-storage';
test('deletion includes nested kid picture folders', async () => {
  const removed=[];
  await deleteStorageTree({list:async p=>({data:p==='parent'?[{name:'kid',id:null}]:[{name:'picture.json',id:'object'}],error:null}),remove:async paths=>{removed.push(...paths);return {error:null};}},'parent');
  expect(removed).toEqual(['parent/kid/picture.json']);
});
test('failed removal is not reported as successful', async () => {
  await expect(deleteStorageTree({list:async()=>({data:[{name:'picture.json',id:'object'}],error:null}),remove:async()=>({error:new Error('offline')})},'parent')).rejects.toThrow('Could not delete all saved pictures');
});