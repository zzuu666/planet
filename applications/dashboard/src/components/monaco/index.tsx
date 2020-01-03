import React, {
    FC,
    useRef,
    useEffect,
    CSSProperties,
    RefObject,
    useCallback,
    MouseEvent,
    useMemo,
    ChangeEvent,
    useState
} from 'react'
import * as monaco from 'monaco-editor'

const useMonaco = (
    containerRef: RefObject<HTMLElement | null>,
    language: string = 'javascript'
) => {
    const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
    const prevValueRed = useRef<string | undefined>('')

    useEffect(() => {
        if (containerRef.current === null) return

        monacoRef.current = monaco.editor.create(containerRef.current, {
            value: prevValueRed.current || '',
            language
        })

        return () => {
            prevValueRed.current = monacoRef.current?.getValue()
            monacoRef.current?.dispose()
        }
    }, [containerRef, language])

    return monacoRef
}

interface IMonacoEditorProps {
    editorStyle?: CSSProperties
    onSave?: (editor: monaco.editor.IStandaloneCodeEditor, language: string) => void
    languageList?: string[]
}

const defaultLanguageList = ['css', 'javascript', 'ruby', 'typescript']

export const MonacoEditor: FC<IMonacoEditorProps> = props => {
    const { editorStyle, onSave, languageList } = props
    const containerRef = useRef<HTMLDivElement>(null)
    const [langType, setLangType] = useState<string>('javascript')
    const edtiorRef = useMonaco(containerRef, langType)

    const memoLanguageList = useMemo(() => {
        if (!languageList) return defaultLanguageList.sort()

        return defaultLanguageList.concat(languageList).sort()
    }, [languageList])

    const handleSaveClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (edtiorRef.current === null) return

            onSave && onSave(edtiorRef.current, langType)
        },
        [onSave, edtiorRef, langType]
    )

    const handleSelectChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            setLangType(event.currentTarget.value)
        },
        []
    )

    return (
        <div>
            <div>
                <select onChange={handleSelectChange} value={langType}>
                    {memoLanguageList.map(lang => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
            <div
                style={{ height: '50vh', width: '80%', ...editorStyle }}
                ref={containerRef}
            />
            <div>
                <button onClick={handleSaveClick}> 保存 </button>
            </div>
        </div>
    )
}
