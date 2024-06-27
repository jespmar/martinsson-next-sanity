
export const Child = ({child}:any) => {

    const style = () => {

        let style = ""

        for (let mark of child.marks) {

            console.log(mark)

            if (mark === "strong") style = style + "font-bold "

        }

        return style

    }

if (child._type === "span") return (
    <span className={style()}>{child.text}</span>
)
else return <p className={style()}>test</p>

}