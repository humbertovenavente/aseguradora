export function Card(props) {
    return (
      <div
        class={`rounded-lg border bg-card text-card-foreground shadow-sm ${props.class}`}
        {...props}
      >
        {props.children}
      </div>
    );
  }
  
  export function CardHeader(props) {
    return (
      <div class={`flex flex-col space-y-1.5 p-6 ${props.class}`} {...props}>
        {props.children}
      </div>
    );
  }
  
  export function CardTitle(props) {
    return (
      <h3
        class={`text-2xl font-semibold leading-none tracking-tight ${props.class}`}
        {...props}
      >
        {props.children}
      </h3>
    );
  }
  
  export function CardDescription(props) {
    return (
      <p class={`text-sm text-muted-foreground ${props.class}`} {...props}>
        {props.children}
      </p>
    );
  }
  
  export function CardContent(props) {
    return (
      <div class={`p-6 pt-0 ${props.class}`} {...props}>
        {props.children}
      </div>
    );
  }
  
  export function CardFooter(props) {
    return (
      <div class={`flex items-center p-6 pt-0 ${props.class}`} {...props}>
        {props.children}
      </div>
    );
  }
  