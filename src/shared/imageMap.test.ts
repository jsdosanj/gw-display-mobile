import displayContent from './display-content';
import { resolveImage, resolveSilhouette } from './imageMap';

// Catches a broken/missing require() mapping at test time rather than as a
// blank image at runtime — every image path the content model references
// must resolve to something bundled.
describe('imageMap completeness', () => {
  it('resolves every Panj Pyare profile image and silhouette', () => {
    for (const pyara of displayContent.panjPyare) {
      expect(resolveImage(pyara.imagePath)).not.toBeNull();
      expect(resolveSilhouette(pyara.silhouettePath)).not.toBeNull();
    }
  });

  it('resolves every Panj Takht profile image', () => {
    for (const takht of displayContent.takhts) {
      expect(resolveImage(takht.imagePath)).not.toBeNull();
    }
  });

  it('falls back to the shared gurdwara silhouette for takhts without one', () => {
    const fallback = '/assets/images/gurdwara-silhouette.svg';
    for (const takht of displayContent.takhts) {
      expect(resolveSilhouette(takht.silhouettePath ?? fallback)).not.toBeNull();
    }
  });

  it('returns null (not a throw) for an unmapped path', () => {
    expect(resolveImage('/assets/images/does-not-exist.jpeg')).toBeNull();
    expect(resolveImage(undefined)).toBeNull();
  });
});
