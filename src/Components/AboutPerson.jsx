export default function Person({ nam, title, desc }) {
    return (
        <div>
            <h1 className="text-4xl mx-auto"><b>{nam}</b></h1>
            <h2 className="mx-auto mb-3 text-slate-500"><i>{title}</i></h2>
            <img src={"https://picsum.photos/500/300?random=" + Math.random(1, 1000)} alt="roger" className="mx-auto mb-3 w-500 h-300" />
            <p className="mb-5 mx-auto">{desc}</p>
        </div>
    )
}