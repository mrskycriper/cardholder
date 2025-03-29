import Pass from "./pass";

export default interface PassBundle {
    id: string,
    objects: {
        pass: Pass,
    },
    files: {
        logo?: File,
    }
}