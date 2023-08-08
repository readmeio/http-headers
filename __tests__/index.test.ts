import getHeaderDescription, { retrieveMarkdown, normalizeHeader } from '../src';

describe('HTTP Headers', () => {
  describe('#retrieveMarkdown', () => {
    it('should request source markdown from MDN', async () => {
      const markdown = await retrieveMarkdown();
      expect(markdown).toContain('title: HTTP headers');
    });
  });

  describe('#normalizeHeader', () => {
    it('should convert a string into header identification format', () => {
      expect(normalizeHeader('Authorization')).toBe('{{HTTPHeader("Authorization")}}');
    });

    it('should capitalize lowercase headers', () => {
      expect(normalizeHeader('content-length')).toBe('{{HTTPHeader("Content-Length")}}');
    });
  });

  describe('#searchHeaderDescription', () => {
    it.todo('should return an empty string if headerNode not found');

    it.todo('should return an empty string if description node has no value');

    it.todo('should return a description');
  });

  describe('#getHeaderDescription', () => {
    it.todo('should retrieve markdown if not already cached');

    it.todo('should return an empty object if something goes wrong');

    it('should return a header description for a string arguement', async () => {
      const headers = 'Connection';
      const descriptions = await getHeaderDescription(headers);
      expect(descriptions).toStrictEqual({
        Connection: 'Controls whether the network connection stays open after the current transaction finishes.',
      });
    });

    it('should return header descriptions for an array of strings', async () => {
      const headers = ['authorization', 'accept'];
      const descriptions = await getHeaderDescription(headers);
      expect(descriptions).toStrictEqual({
        accept: 'Informs the server about the {{Glossary("MIME_type", "types")}} of data that can be sent back.',
        authorization: 'Contains the credentials to authenticate a user-agent with a server.',
      });
    });
  });
});
