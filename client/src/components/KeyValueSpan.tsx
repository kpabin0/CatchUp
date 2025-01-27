interface IKV {
    k?: string,
    v?: string,
    sep?: string
};

export const KeyValSpan1 = ({k, v, sep} : IKV) => {
    return (
        <div className="text-md text-theme space-x-2">
            {k ? <span className="font-bold">{k}</span> : <></>}
            {sep}
            {v ? <span className="">{v}</span> : <></>}
        </div>
    )
}