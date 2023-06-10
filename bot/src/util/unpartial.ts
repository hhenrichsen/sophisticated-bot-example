type NotPartial<T> = MaybePartial<T> & {
    partial: false;
};

type MaybePartial<T> = T & {
    partial: boolean;
    fetch(): Promise<NotPartial<T>>;
};

export function unpartial<T>(
    maybePartial: MaybePartial<T>
): Promise<NotPartial<T>> | NotPartial<T> {
    if (maybePartial.partial === false) {
        return maybePartial as NotPartial<T>;
    } else {
        return maybePartial.fetch() as Promise<NotPartial<T>>;
    }
}
