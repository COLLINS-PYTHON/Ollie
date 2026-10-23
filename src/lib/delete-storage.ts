type StorageEntry = { name: string; id: string | null };
type StoragePort = {
  list: (prefix: string, options: { limit: number; offset: number }) => Promise<{ data: StorageEntry[] | null; error: unknown }>;
  remove: (paths: string[]) => Promise<{ error: unknown }>;
};
export async function deleteStorageTree(storage: StoragePort, prefix: string): Promise<void> {
  const paths: string[] = [];
  async function collect(folder: string) {
    for (let offset = 0; ; offset += 100) {
      const result = await storage.list(folder, { limit: 100, offset });
      if (result.error) throw new Error('Could not read saved pictures. Please retry.');
      const entries = result.data ?? [];
      for (const entry of entries) {
        const path = `${folder}/${entry.name}`;
        if (entry.id === null) await collect(path); else paths.push(path);
      }
      if (entries.length < 100) break;
    }
  }
  await collect(prefix);
  for (let start = 0; start < paths.length; start += 100) {
    const result = await storage.remove(paths.slice(start, start + 100));
    if (result.error) throw new Error('Could not delete all saved pictures. Please retry.');
  }
}