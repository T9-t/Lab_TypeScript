function addTag(tags: readonly string[], tag: string): string[] {
    if (tags.includes(tag)) {
        return [...tags];
    }
    return [...tags, tag];
}

function removeTag(tags: readonly string[], tag: string): string[] {
    return [...tags].filter((item) => item !== tag);
}

function mergeTags(firstTags: readonly string[], secondTags: readonly string[]): string[] {
    return [...new Set([...firstTags, ...secondTags])];
}


const tagsList = ['tag1', 'tag2', 'tag3', 'tag4'];
const otherTagsList = ['tag1', 'tag1.1', 'tag1.2'];

const addNewTag = addTag(tagsList, 'tag5');
console.log('Старый массив:', tagsList);
console.log('Новый массив:', addNewTag);

const newRemoveTag = removeTag(tagsList, 'tag3');
console.log('Старый массив:', tagsList);
console.log('Новый массив:', newRemoveTag);

const merged = mergeTags(tagsList, otherTagsList);
console.log('После объединения массивов 1 и 2:', merged);
console.log('Старый массив 1:', tagsList);
console.log('Старый массив 2:', otherTagsList);