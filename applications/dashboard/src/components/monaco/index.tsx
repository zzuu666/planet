import React, { FC, useRef, useEffect, CSSProperties, RefObject, useCallback, MouseEvent} from 'react'
import * as monaco from 'monaco-editor'


const useMonaco = (containerRef: RefObject<HTMLElement | null>) => {
    const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    useEffect(() => {
        if (containerRef.current === null) return

        monacoRef.current = monaco.editor.create(containerRef.current, {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        })
    }, [containerRef])

    return monacoRef
}

interface IMonacoEditorProps {
    editorStyle?: CSSProperties
    onSave?: (editor: monaco.editor.IStandaloneCodeEditor) => void
}

export const MonacoEditor: FC<IMonacoEditorProps>= props => {
    const { editorStyle, onSave } = props
    const containerRef = useRef<HTMLDivElement>(null)
    const edtiorRef = useMonaco(containerRef)

    const handleSaveClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        if (edtiorRef.current === null) return

        onSave && onSave(edtiorRef.current)
    }, [onSave, edtiorRef])

    return (
        <div>
            <div>

            </div>
            <div style={{ height: '50vh', width: '80%' }} ref={containerRef} />
            <div>
                <button onClick={handleSaveClick} > 保存 </button>
            </div>
        </div>
    )
}
