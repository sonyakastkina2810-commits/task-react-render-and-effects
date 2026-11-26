import React, { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

interface IProps {
    sourceId: string;
}

interface IState {
    sourceId: string;
    message: number | string;
}

export function Effects({ sourceId }: IProps) {
    const [state, setState] = useState<IState>({ sourceId, message: -1 });

    useEffect(() => {
        // callback создаётся внутри эффекта, чтобы для unsubscribe
        // использовалась та же самая ссылка, что и для subscribe
        const callback = (message: number | string) => {
            setState({ sourceId, message });
        };

        subscribe(sourceId, callback);

        return () => {
            unsubscribe(sourceId, callback);
        };
    }, [sourceId]);

    // После смены источника сообщений от него ещё не было, поэтому -1.
    // Сравнение с sourceId не даёт на один рендер показать старое сообщение.
    const message = state.sourceId === sourceId ? state.message : -1;

    return (
        <div>
            {sourceId}: {message}
        </div>
    );
}

export default Effects;
