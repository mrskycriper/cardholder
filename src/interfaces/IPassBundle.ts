import Pass from "./IPass";

export default interface PassBundle {
    id: string,
    objects: {
        pass: Pass,
    },
    files: {
        logo?: File,
    }
}