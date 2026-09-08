import { uploadFile } from '../../../services/apiClient';
import styles from '../admin.module.css';
import contentStyles from './AdminContent.module.css';
import { useContentPage } from './useContentPage';

const MAX_STATS = 3;
const MAX_HIGHLIGHTS = 3;

/** Editor for the About page's story, mission, quality-promise, and fresh-ingredients copy. */
function AboutContentForm() {
  const { content, setContent, save, status, isSaving } = useContentPage('about');

  if (!content) return <p>Loading…</p>;

  const update = (path, value) => {
    setContent((current) => {
      const next = structuredClone(current);
      let cursor = next;
      for (let i = 0; i < path.length - 1; i += 1) cursor = cursor[path[i]];
      cursor[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleImageUpload = async (path, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const { url } = await uploadFile(file);
    update(path, url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  const addListEntry = (path, entry) => update(path, [...getAt(content, path), entry]);
  const updateListEntry = (path, index, changes) =>
    update(path, getAt(content, path).map((item, i) => (i === index ? { ...item, ...changes } : item)));
  const removeListEntry = (path, index) =>
    update(path, getAt(content, path).filter((_, i) => i !== index));

  return (
    <form className={contentStyles.formBody} onSubmit={handleSubmit}>
      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Our story</h2>
          </div>
        </div>
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Eyebrow</span>
            <input value={content.story.eyebrow} onChange={(e) => update(['story', 'eyebrow'], e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Heading</span>
            <input value={content.story.heading} onChange={(e) => update(['story', 'heading'], e.target.value)} />
          </label>
        </div>
        <label className={styles.field}>
          <span>Lead</span>
          <input value={content.story.lead} onChange={(e) => update(['story', 'lead'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Description</span>
          <textarea rows={3} value={content.story.description} onChange={(e) => update(['story', 'description'], e.target.value)} />
        </label>
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Caption title</span>
            <input value={content.story.caption.title} onChange={(e) => update(['story', 'caption', 'title'], e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Caption description</span>
            <input
              value={content.story.caption.description}
              onChange={(e) => update(['story', 'caption', 'description'], e.target.value)}
            />
          </label>
        </div>
        <label className={styles.field}>
          <span>Image</span>
          {content.story.image && <img src={content.story.image} alt="" width={80} style={{ borderRadius: 8 }} />}
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(['story', 'image'], e)} />
        </label>

        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h3 className={contentStyles.sectionTitle}>
              Stats <span className={contentStyles.countBadge}>({content.story.stats.length}/{MAX_STATS})</span>
            </h3>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => addListEntry(['story', 'stats'], { value: '', label: '' })}
            disabled={content.story.stats.length >= MAX_STATS}
          >
            Add stat
          </button>
        </div>
        {content.story.stats.length === 0 ? (
          <p className={contentStyles.emptyList}>No stats yet. Add up to {MAX_STATS}.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.story.stats.map((stat, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button
                    type="button"
                    className={contentStyles.itemRemove}
                    onClick={() => removeListEntry(['story', 'stats'], index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
                  <label className={styles.field}>
                    <span>Value</span>
                    <input value={stat.value} onChange={(e) => updateListEntry(['story', 'stats'], index, { value: e.target.value })} />
                  </label>
                  <label className={styles.field}>
                    <span>Label</span>
                    <input value={stat.label} onChange={(e) => updateListEntry(['story', 'stats'], index, { label: e.target.value })} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Our mission</h2>
          </div>
        </div>
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Eyebrow</span>
            <input value={content.mission.eyebrow} onChange={(e) => update(['mission', 'eyebrow'], e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Heading</span>
            <input value={content.mission.heading} onChange={(e) => update(['mission', 'heading'], e.target.value)} />
          </label>
        </div>
        <label className={styles.field}>
          <span>Intro</span>
          <textarea rows={2} value={content.mission.intro} onChange={(e) => update(['mission', 'intro'], e.target.value)} />
        </label>

        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h3 className={contentStyles.sectionTitle}>Values</h3>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => addListEntry(['mission', 'values'], { number: '', title: '', description: '' })}
          >
            Add value
          </button>
        </div>
        {content.mission.values.length === 0 ? (
          <p className={contentStyles.emptyList}>No values yet.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.mission.values.map((value, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button
                    type="button"
                    className={contentStyles.itemRemove}
                    onClick={() => removeListEntry(['mission', 'values'], index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
                  <label className={styles.field}>
                    <span>Number</span>
                    <input value={value.number} onChange={(e) => updateListEntry(['mission', 'values'], index, { number: e.target.value })} />
                  </label>
                  <label className={styles.field}>
                    <span>Title</span>
                    <input value={value.title} onChange={(e) => updateListEntry(['mission', 'values'], index, { title: e.target.value })} />
                  </label>
                  <label className={styles.field}>
                    <span>Description</span>
                    <input
                      value={value.description}
                      onChange={(e) => updateListEntry(['mission', 'values'], index, { description: e.target.value })}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>The quality promise</h2>
          </div>
        </div>
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Eyebrow</span>
            <input value={content.qualityPromise.eyebrow} onChange={(e) => update(['qualityPromise', 'eyebrow'], e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Heading</span>
            <input value={content.qualityPromise.heading} onChange={(e) => update(['qualityPromise', 'heading'], e.target.value)} />
          </label>
        </div>
        <label className={styles.field}>
          <span>Description</span>
          <textarea
            rows={2}
            value={content.qualityPromise.description}
            onChange={(e) => update(['qualityPromise', 'description'], e.target.value)}
          />
        </label>
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Note title</span>
            <input
              value={content.qualityPromise.note.title}
              onChange={(e) => update(['qualityPromise', 'note', 'title'], e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Note description</span>
            <input
              value={content.qualityPromise.note.description}
              onChange={(e) => update(['qualityPromise', 'note', 'description'], e.target.value)}
            />
          </label>
        </div>
        <label className={styles.field}>
          <span>Image</span>
          {content.qualityPromise.image && <img src={content.qualityPromise.image} alt="" width={80} style={{ borderRadius: 8 }} />}
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(['qualityPromise', 'image'], e)} />
        </label>

        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h3 className={contentStyles.sectionTitle}>Promises</h3>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => addListEntry(['qualityPromise', 'promises'], { title: '', description: '' })}
          >
            Add promise
          </button>
        </div>
        {content.qualityPromise.promises.length === 0 ? (
          <p className={contentStyles.emptyList}>No promises yet.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.qualityPromise.promises.map((promise, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button
                    type="button"
                    className={contentStyles.itemRemove}
                    onClick={() => removeListEntry(['qualityPromise', 'promises'], index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
                  <label className={styles.field}>
                    <span>Title</span>
                    <input
                      value={promise.title}
                      onChange={(e) => updateListEntry(['qualityPromise', 'promises'], index, { title: e.target.value })}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Description</span>
                    <input
                      value={promise.description}
                      onChange={(e) => updateListEntry(['qualityPromise', 'promises'], index, { description: e.target.value })}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Fresh ingredients</h2>
          </div>
        </div>
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Eyebrow</span>
            <input value={content.freshIngredients.eyebrow} onChange={(e) => update(['freshIngredients', 'eyebrow'], e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Heading</span>
            <input value={content.freshIngredients.heading} onChange={(e) => update(['freshIngredients', 'heading'], e.target.value)} />
          </label>
        </div>
        <label className={styles.field}>
          <span>Description</span>
          <textarea
            rows={2}
            value={content.freshIngredients.description}
            onChange={(e) => update(['freshIngredients', 'description'], e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>Closing line</span>
          <input value={content.freshIngredients.closing} onChange={(e) => update(['freshIngredients', 'closing'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Image</span>
          {content.freshIngredients.image && <img src={content.freshIngredients.image} alt="" width={80} style={{ borderRadius: 8 }} />}
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(['freshIngredients', 'image'], e)} />
        </label>

        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h3 className={contentStyles.sectionTitle}>
              Highlights <span className={contentStyles.countBadge}>({content.freshIngredients.highlights.length}/{MAX_HIGHLIGHTS})</span>
            </h3>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => addListEntry(['freshIngredients', 'highlights'], { label: '', accent: 'red' })}
            disabled={content.freshIngredients.highlights.length >= MAX_HIGHLIGHTS}
          >
            Add highlight
          </button>
        </div>
        {content.freshIngredients.highlights.length === 0 ? (
          <p className={contentStyles.emptyList}>No highlights yet. Add up to {MAX_HIGHLIGHTS}.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.freshIngredients.highlights.map((highlight, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button
                    type="button"
                    className={contentStyles.itemRemove}
                    onClick={() => removeListEntry(['freshIngredients', 'highlights'], index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
                  <label className={styles.field}>
                    <span>Label</span>
                    <input
                      value={highlight.label}
                      onChange={(e) => updateListEntry(['freshIngredients', 'highlights'], index, { label: e.target.value })}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Accent (red/yellow/dark)</span>
                    <input
                      value={highlight.accent}
                      onChange={(e) => updateListEntry(['freshIngredients', 'highlights'], index, { accent: e.target.value })}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className={contentStyles.saveBar}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save about content'}
        </button>
        {status && (
          <p className={contentStyles.saveStatus} data-type={status.type}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

const getAt = (object, path) => path.reduce((cursor, key) => cursor[key], object);

export default AboutContentForm;
