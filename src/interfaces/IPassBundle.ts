import Pass from "./IPass";

export default interface PassBundle {
    name: string,
    objects: {
        pass: Pass,
    },
    files: {
        logo?: File,
    }
}